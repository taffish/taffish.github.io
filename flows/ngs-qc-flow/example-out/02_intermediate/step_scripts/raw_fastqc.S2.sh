#!/bin/sh
set -eu
fastqc --threads '4' --outdir 'example-out/03_results/raw_fastqc/S2' --quiet --nogroup 'ngs-qc-flow/testdata/S2.fastq'
