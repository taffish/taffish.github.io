#!/bin/sh
set -eu
fastp -i 'ngs-qc-flow/testdata/P1_R1.fastq' -I 'ngs-qc-flow/testdata/P1_R2.fastq' -o 'example-out/03_results/clean_fastq/P1_R1.clean.fastq.gz' -O 'example-out/03_results/clean_fastq/P1_R2.clean.fastq.gz' -h 'example-out/03_results/fastp/P1.fastp.html' -j 'example-out/03_results/fastp/P1.fastp.json' -w '4' --detect_adapter_for_pe --qualified_quality_phred '20' --length_required '15'
