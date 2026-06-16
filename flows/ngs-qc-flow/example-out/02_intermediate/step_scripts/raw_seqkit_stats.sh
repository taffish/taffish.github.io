#!/bin/sh
set -eu
seqkit stats -T -j '4' -a 'ngs-qc-flow/testdata/P1_R1.fastq' 'ngs-qc-flow/testdata/P1_R2.fastq' 'ngs-qc-flow/testdata/S2.fastq' > 'example-out/03_results/raw_seqkit/raw_fastq_stats.tsv'
