#!/bin/sh
set -eu
fastp -i 'ngs-qc-flow/testdata/S2.fastq' -o 'example-out/03_results/clean_fastq/S2.clean.fastq.gz' -h 'example-out/03_results/fastp/S2.fastp.html' -j 'example-out/03_results/fastp/S2.fastp.json' -w '4' --qualified_quality_phred '20' --length_required '15'
