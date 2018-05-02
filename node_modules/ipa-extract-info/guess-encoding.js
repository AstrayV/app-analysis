'use strict';

const ZIP_ENCODING_UNKNOWN = 0;
const ZIP_ENCODING_ASCII = 1;
const ZIP_ENCODING_UTF8_KNOWN = 2;
const ZIP_ENCODING_UTF8_GUESSED = 3;
const ZIP_ENCODING_CP437 = 4;
const ZIP_ENCODING_ERROR = 5;

module.exports.zipEncodings = {
  unknown: ZIP_ENCODING_UNKNOWN,
  ascii: ZIP_ENCODING_ASCII,
  utf8known: ZIP_ENCODING_UTF8_KNOWN,
  utf8guessed: ZIP_ENCODING_UTF8_GUESSED,
  cp437: ZIP_ENCODING_CP437,
  error: ZIP_ENCODING_ERROR
}

const UTF_8_LEN_2_MASK     = 0xe0;
const UTF_8_LEN_2_MATCH    = 0xc0;
const UTF_8_LEN_3_MASK     = 0xf0;
const UTF_8_LEN_3_MATCH    = 0xe0;
const UTF_8_LEN_4_MASK     = 0xf8;
const UTF_8_LEN_4_MATCH    = 0xf0;
const UTF_8_CONTINUE_MASK  = 0xc0;
const UTF_8_CONTINUE_MATCH = 0x80;

module.exports.zipGuessEncoding = zipGuessEncoding;

function zipGuessEncoding (buf, expectedEncoding) {
  let enc = ZIP_ENCODING_UNKNOWN;

  if (!buf) {
    return ZIP_ENCODING_ASCII;
  }

  enc = ZIP_ENCODING_ASCII;
  for (let i=0; i < buf.length; ++i) {
    if ((buf[i] > 31 && buf[i] < 128) || buf[i] == '\r' || buf[i] == '\n' || buf[i] == '\t') {
      continue;
    }

    let ulen;
    enc = ZIP_ENCODING_UTF8_GUESSED;
    if ((buf[i] & UTF_8_LEN_2_MASK) == UTF_8_LEN_2_MATCH)
      ulen = 1;
    else if ((buf[i] & UTF_8_LEN_3_MASK) == UTF_8_LEN_3_MATCH)
      ulen = 2;
    else if ((buf[i] & UTF_8_LEN_4_MASK) == UTF_8_LEN_4_MATCH)
      ulen = 3;
    else {
      enc = ZIP_ENCODING_CP437;
      break;
    }

    if (i + ulen >= buf.length) {
      enc = ZIP_ENCODING_CP437;
      break;
    }

    for (let j=1; j<=ulen; j++) {
      if ((buf[i+j] & UTF_8_CONTINUE_MASK) != UTF_8_CONTINUE_MATCH) {
        enc = ZIP_ENCODING_CP437;
        return done();
      }
    }
    i += ulen;
  }

  return done();

  function done () {
    const expected = expectedEncoding || ZIP_ENCODING_UNKNOWN;
    if (expected !== ZIP_ENCODING_UNKNOWN) {
      if (expected === ZIP_ENCODING_UTF8_KNOWN && enc === ZIP_ENCODING_UTF8_GUESSED) {
        enc = ZIP_ENCODING_UTF8_KNOWN;
      }
      if (expected !== enc && enc !== ZIP_ENCODING_ASCII) {
        return ZIP_ENCODING_ERROR;
      }
    }
    return enc;
  }
}

// zip_encoding_type_t
//   117 _zip_guess_encoding(zip_string_t *str, zip_encoding_type_t expected_encoding)
//   118 {
//   119     zip_encoding_type_t enc;
//   120     const zip_uint8_t *name;
//   121     zip_uint32_t i, j, ulen;
//   122 
//   123     if (str == NULL)
//   124     return ZIP_ENCODING_ASCII;
//   125 
//   126     name = str->raw;
//   127 
//   128     if (str->encoding != ZIP_ENCODING_UNKNOWN)
//   129     enc = str->encoding;
//   130     else {
//   131     enc = ZIP_ENCODING_ASCII;
//   132     for (i=0; i<str->length; i++) {
//   133         if ((name[i] > 31 && name[i] < 128) || name[i] == '\r' || name[i] == '\n' || name[i] == '\t')
//   134         continue;
//   135 
//   136         enc = ZIP_ENCODING_UTF8_GUESSED;
//   137         if ((name[i] & UTF_8_LEN_2_MASK) == UTF_8_LEN_2_MATCH)
//   138         ulen = 1;
//   139         else if ((name[i] & UTF_8_LEN_3_MASK) == UTF_8_LEN_3_MATCH)
//   140         ulen = 2;
//   141         else if ((name[i] & UTF_8_LEN_4_MASK) == UTF_8_LEN_4_MATCH)
//   142         ulen = 3;
//   143         else {
//   144         enc = ZIP_ENCODING_CP437;
//   145         break;
//   146         }
//   147 
//   148         if (i + ulen >= str->length) {
//   149         enc = ZIP_ENCODING_CP437;
//   150         break;
//   151         }
//   152 
//   153         for (j=1; j<=ulen; j++) {
//   154         if ((name[i+j] & UTF_8_CONTINUE_MASK) != UTF_8_CONTINUE_MATCH) {
//   155             enc = ZIP_ENCODING_CP437;
//   156             goto done;
//   157         }
//   158         }
//   159         i += ulen;
//   160     }
//   161     }
//   162 
//   163 done:
//   164     str->encoding = enc;
//   165 
//   166     if (expected_encoding != ZIP_ENCODING_UNKNOWN) {
//   167     if (expected_encoding == ZIP_ENCODING_UTF8_KNOWN && enc == ZIP_ENCODING_UTF8_GUESSED)
//   168         str->encoding = enc = ZIP_ENCODING_UTF8_KNOWN;
//   169 
//   170     if (expected_encoding != enc && enc != ZIP_ENCODING_ASCII)
//   171         return ZIP_ENCODING_ERROR;
//   172     }
//   173     
//   174     return enc;
//   175 }
