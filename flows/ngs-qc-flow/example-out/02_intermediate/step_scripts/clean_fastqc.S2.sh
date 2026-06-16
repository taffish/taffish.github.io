#!/bin/sh
set -eu
fastqc --threads '4' --outdir 'example-out/03_results/clean_fastqc/S2' --quiet --nogroup 'example-out/03_results/clean_fastq/S2.clean.fastq.gz'
