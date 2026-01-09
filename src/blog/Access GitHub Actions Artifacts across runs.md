---
title: Access GitHub Actions Artifacts across runs
pubDate: 2026-01-09T13:17:28
description: Github Actions artifacts are bound to the run they are generated under.
---

GitHub actions allows you to store artifacts to retrieve later. One confusing aspect is that it's only really designed to work inside the same workflow run.

Let's say when submitting a pull request, you wanted to compare test coverage between that PR and `main`. You could do (shortened for readability):

```yaml
jobs:
  test-pr:
    steps:
    - uses: actions/checkout@v5
    # setup etc
    - name: Test
      run: pnpm test --coverage
    - name: Store coverage
      uses: actions/upload-artifact@v6
      with:
        name: coverage-pr
        path: coverage/
  test-main:
    steps:
    - uses: actions/checkout@v5
      with:
        ref: main
    # setup etc
    - name: Test
      run: pnpm test --coverage
    - name: Store coverage
      uses: actions/upload-artifact@v6
      with:
        name: coverage-main
        path: coverage/
  compare-coverage:
    needs: [test-pr, test-main]
    steps:
    - uses: actions/download-artifact@v7
      with:
        name: coverage-pr
        path: ./coverage-pr
    - uses: actions/download-artifact@v7
      with:
        name: coverage-main
        path: ./coverage-main
    - name: Report coverage
      # Coverage action goes here
```

The "main" problem may stand out to you. 

Pun intended! We are running the tests **twice** for each PR workflow run: once against `main` and once against our PR. This is both wasteful and slow. As only the branch is changing, we should only need to re-run tests against the branch.

Most repositories I work on run tests against `main` on merge, requiring the tests pass before deployment. In this scenario we know we've run the tests before, and it shouldn't need to be repeated. We can store the coverage when the tests are run on `main`, and then retrieve them in PRs.

Unfortunately GitHub Actions doesn't make supporting this easy. As each artifact is bound to a run id, you'll need to know that first.

We're going to use the [Github CLI](https://cli.github.com/) for this, because you get it for free when running scripts under GitHub Actions: 

```sh
gh api \
  repos/$ORG/$REPO/actions/workflows/$ACTION_FILENAME>/runs \
  -q "first(.workflow_runs[] | select( \
        .head_branch == \"main\" and \
        .status == \"completed\" and \
        .conclusion == \"success\")).id"
```

In Github, `$ORG\$REPO` will be `${{ github.repository }}`. `$ACTION_FILENAME` is the literal file name on disk inside your `/actions/workflows/` directory of your repo: eg `cicd.yaml`.

Once you have run id you can request your artifact with that run id (again, shortened for readability):

```yaml
jobs:
  test-pr:
    steps:
    - uses: actions/checkout@v5
    # setup etc
    - name: Test
      run: pnpm test --coverage
    - name: Store coverage
      uses: actions/upload-artifact@v6
      with:
        name: coverage-pr
        path: coverage/
  compare-coverage:
    needs: [test-pr, test-main]
    steps:
    - name: Get last main run id
      id: main_run_id
      run: |
        RUN_ID=$(gh api \
		  repos/${{ githuv.repository }}$/actions/workflows/cicd.yaml/runs \
          -q "first(.workflow_runs[] | select( \
            .head_branch == \"main\" and \
            .status == \"completed\" and \
            .conclusion == \"success\"
          )).id"
        )
        
        echo "run_uid=$RUN_id" >> $GITHUB_OUTPUT
    - uses: actions/download-artifact@v7
      with:
        name: coverage-pr
        path: ./coverage-pr
    - uses: actions/download-artifact@v7
      with:
        name: coverage-main
        # New bit! We are presuming that this has been generated in cicd.yaml
        run-id: ${{ steps.main_run_id.outputs.run_id }} 
        path: ./coverage-main
    - name: Report coverage
      # Coverage action goes here
```