MAKEFLAGS := -j 4

SHELL := /bin/bash

.DELETE_ON_ERROR:

PROBLEM_DESCRIPTIONS_MD := $(wildcard problems/*/description.md)
PROBLEM_DESCRIPTIONS_HTML := $(PROBLEM_DESCRIPTIONS_MD:%.md=%.html)

SAMPLE_DESCRIPTIONS_MD := $(wildcard samples/*/description.md)
SAMPLE_DESCRIPTIONS_HTML := $(SAMPLE_DESCRIPTIONS_MD:%.md=%.html)

all: problem-descriptions.pdf sample-descriptions.pdf

include $(wildcard problems/*/Makefile)

test-%:
	@for f in $(sort $(wildcard problems/$*/solutions/*.run samples/$*/solutions/*.run)); do \
		for g in $(sort $(wildcard problems/$*/tests/*.run samples/$*/tests/*.in)); do \
			if colordiff -b "$${g/.in/.out}" <("$$f" < "$$g"); then \
				echo "Solution $$(basename $$f .run), Test $$(basename $$g .in): SUCCESS"; \
			else \
				echo "Solution $$(basename $$f .run), Test $$(basename $$g .in): FAILURE"; \
			fi \
		done \
	done

%/description.html: %/description.md convert.html.erb
	ruby -rerb -rnet/http -e 'puts ERB.new(File.read "convert.html.erb").result' < $< > $@

problem-descriptions.pdf: $(PROBLEM_DESCRIPTIONS_HTML) $(shell find problems -name '*.png')
	wkhtmltopdf -g --print-media-type $^ $@

sample-descriptions.pdf: $(SAMPLE_DESCRIPTIONS_HTML) $(shell find samples -name '*.png')
	wkhtmltopdf -g --print-media-type $^ $@
