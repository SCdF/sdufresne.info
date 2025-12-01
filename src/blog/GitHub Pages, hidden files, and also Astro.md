---
title: GitHub Pages, hidden files, and also Astro
pubDate: 2025-12-01
description: Recently GitHub Pages made what feels like a somewhat questionable decision to silently ignore hidden files when using the upload-pages-artifact action to publish to GitHub Pages.
---

Recently GitHub Pages made what feels like [a somewhat questionable decision](https://github.com/actions/upload-pages-artifact/pull/102) to silently ignore hidden files when using the `upload-pages-artifact` action to publish to GitHub Pages.

In turn, this broke [Astro](https://astro.build/)'s [recommended way to publish to GitHub pages](https://docs.astro.build/en/guides/deploy/github/), as it uses `upload-pages-artifact` internally.

While ignoring hidden files initially seems like a good idea, for websites this breaks `.well-known`, a standardized location for [dozens of service resouces](https://en.wikipedia.org/wiki/Well-known_URI#List_of_well-known_URIs).

To work around this for Astro specifically, make sure to use at least [`5.0.1`](https://github.com/withastro/action/releases/tag/v5.0.1) of their action, which implements the workaround below.

If you use `upload-pages-artifact` directly, your choices are either use [`3.0.1`](https://github.com/actions/upload-pages-artifact/releases/tag/v3.0.1) but lose version pinning, or construct and upload the archive yourself. Pages requires archives to be shaped a specific way, so the easiest is to [copy their homework](https://github.com/actions/upload-pages-artifact/blob/7b1f4a764d45c48632c6b24a0339c27f5614fb0b/action.yml), but remove the hidden files excludes.

This is more faff than ideal, especially if you want to support multiple runner OS'.

```yml
- name: Archive artifact
  shell: sh
  if: runner.os == 'Linux'
  run: |
    echo ::group::Archive artifact
    tar \
      --dereference --hard-dereference \
      --directory "$INPUT_PATH" \
      -cvf "$RUNNER_TEMP/artifact.tar" \
      --exclude=.git \
      --exclude=.github \
      .
    echo ::endgroup::
  env:
    INPUT_PATH: ${{ inputs.path }}/dist/

- name: Archive artifact
  shell: sh
  if: runner.os == 'macOS'
  run: |
    echo ::group::Archive artifact
    gtar \
      --dereference --hard-dereference \
      --directory "$INPUT_PATH" \
      -cvf "$RUNNER_TEMP/artifact.tar" \
      --exclude=.git \
      --exclude=.github \
      .
    echo ::endgroup::
  env:
    INPUT_PATH: ${{ inputs.path }}/dist/

- name: Archive artifact
  shell: bash
  if: runner.os == 'Windows'
  run: |
    echo ::group::Archive artifact
    tar \
      --dereference --hard-dereference \
      --directory "$INPUT_PATH" \
      -cvf "$RUNNER_TEMP\artifact.tar" \
      --exclude=.git \
      --exclude=.github \
      --force-local \
      "."
    echo ::endgroup::
  env:
    INPUT_PATH: ${{ inputs.path }}/dist/

- name: Upload artifact
  id: upload-artifact
  uses: actions/upload-artifact@ea165f8d65b6e75b540449e92b4886f43607fa02 # v4.6.2
  with:
    name: ${{ inputs.name }}
    path: ${{ runner.temp }}/artifact.tar
    retention-days: ${{ inputs.retention-days }}
    if-no-files-found: error
```

Hopefully GitHub will update their action ([filed ticket](https://github.com/actions/upload-pages-artifact/issues/129)), as working around it is quite painful, and inconsistent with their regular [`upload-artifact`](https://github.com/actions/upload-artifact?tab=readme-ov-file#uploading-hidden-files) action, which supports `include-hidden-files: true`.
