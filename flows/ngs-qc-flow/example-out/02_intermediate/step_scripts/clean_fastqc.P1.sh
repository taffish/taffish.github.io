#!/bin/sh
set -eu
fastqc --threads '4' --outdir 'example-out/03_results/clean_fastqc/P1' --quiet --nogroup 'example-out/03_results/clean_fastq/P1_R1.clean.fastq.gz' 'example-out/03_results/clean_fastq/P1_R2.clean.fastq.gz'
