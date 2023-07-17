#!/bin/bash
#
# Script to get GCP GPU availability zone info from Google

appname=`basename "$0"`
gpumodel=''
output='table'

usage() {
    echo "$appname - script to list GCE zones with GPUs"
    echo ""
    echo "This script prints a list of GCE availability zones that have the"
    echo "given GPU (needed to support live walkthrough). The GPU information"
    echo "is not obtainable from any API or gcloud or gsutil commands, but we"
    echo "can parse it from the following Google web status page:"
    echo ""
    echo "https://cloud.google.com/compute/docs/gpus/gpu-regions-zones"
    echo ""
    echo "usage: $appname <gpu-spec> [options]"
    echo ""
    echo "   gpu-spec - GPU specification (e.g. T4, P100, ...)"
    echo ""
    echo "   options:"
    echo "       -o, --output - Output format, json or table (default)"
    echo "       -h, --help   - Print this help info"
    echo ""
    echo ""
    echo "examples:"
    echo ""
    echo "    $appname          -  prints all zones with all GPUs"
    echo "    $appname -o json  -  prints zone info in JSON format"
    echo "    $appname T4       -  prints zones containing Tesla T4 GPUs"
    echo "    $appname P100     -  prints zones containing P100 GPUs"
    echo ""
}

while [ -n "$1" ]
do
    case $1 in
        -\?|-h|--help|help) usage; exit 0;;
        --output|-o) output=$2; shift 2;;
        -*) echo "$appname: error, unknown option '$1', see --help for usage"; exit 1;;
        *)  gpumodel="$1"; shift;;
    esac
done


#pushd gcp-zones > /dev/null

npm run --silent start "$gpumodel" "$output"
