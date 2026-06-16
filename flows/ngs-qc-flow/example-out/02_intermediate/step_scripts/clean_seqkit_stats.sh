#!/bin/sh
set -eu
seqkit stats -T -j '4' -a 'example-out/03_results/clean_fastq/P1_R1.clean.fastq.gz' 'example-out/03_results/clean_fastq/P1_R2.clean.fastq.gz' 'example-out/03_results/clean_fastq/S2.clean.fastq.gz' > 'example-out/03_results/clean_seqkit/clean_fastq_stats.tsv'
