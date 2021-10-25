#!/bin/bash
node index.js > a
diff a test/expected.out
EXITCODE=$?
rm a

if [ $EXITCODE -gt 0 ]; then
  echo 'e2e FAILED'
  exit 1
fi
echo 'e2e PASSED'

