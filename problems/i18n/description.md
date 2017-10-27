# i18n

Internationalization. What a long word, am I right? I prefer to say i18n (I-Eighteen-N), it is so much easier!

At Lucid Software we are expanding our reach by translating our products into many different languages. This is part of the internationalization process of adapting to different cultures. The standard abbreviation for this process is i18n. The abbreviation is obtained by replacing all the inner characters of the word with the number of inner characters.

Apply this same abbreviation method to the words we provide.

### Input


The first line will contain W, the number of words to abbreviate.
The next W lines each contain one word.

### Output


Print W lines where each line contains the abbreviated form of the word.

### Constraints


1 <= W <= 100

1 <= len(word) <= 30

a <= char in word <= z

# Example

### Input

```
5
i
am
the
cool
coder
```

### Output

```
i
am
t1e
c2l
c3r
```

### Explanation


In the first two words the are no inner characters. The words are already in their abbreviated forms.

In the last three words only the first and last charaters are kept. The inner characters are replaced by the number of inner characters.
