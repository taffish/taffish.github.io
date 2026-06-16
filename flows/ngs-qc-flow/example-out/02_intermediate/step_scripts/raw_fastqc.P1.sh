#!/bin/sh
set -eu
fastqc --threads '4' --outdir 'example-out/03_results/raw_fastqc/P1' --quiet --nogroup 'ngs-qc-flow/testdata/P1_R1.fastq' 'ngs-qc-flow/testdata/P1_R2.fastq'
