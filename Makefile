MAKEFLAGS := -j 4

SHELL := /bin/bash

.DELETE_ON_ERROR:

PROBLEM_DESCRIPTIONS_MD := $(wildcard problems/*/description.md)
PROBLEM_DESCRIPTIONS_HTML := $(PROBLEM_DESCRIPTIONS_MD:%.md=%.html)

SAMPLE_DESCRIPTIONS_MD := $(wildcard samples/*/description.md)
SAMPLE_DESCRIPTIONS_HTML := $(SAMPLE_DESCRIPTIONS_MD:%.md=%.html)

all: problem-descriptions.pdf sample-descriptions.pdf

%/description.html: %/description.md convert.html.erb
	ruby -rerb -rnet/http -e 'puts ERB.new(File.read "convert.html.erb").result' < $< > $@

problem-descriptions.pdf: $(PROBLEM_DESCRIPTIONS_HTML)
	wkhtmltopdf -g --print-media-type $^ $@

sample-descriptions.pdf: $(SAMPLE_DESCRIPTIONS_HTML)
	wkhtmltopdf -g --print-media-type $^ $@
