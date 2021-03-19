#!/bin/bash

if [ "$1" = "createmigrations" ]; then
  ### Run code to create migrations

  ## Create TMP database
  ## Run existing migrations on TMP database
  ## Generate migrations:
  ## yarn pg-diff-file -c development initial_diff
  ##
  echo "create"
fi

if [ "$1" = "runmigrations" ]; then
  ### Run code to run migrations
  echo "run"
fi