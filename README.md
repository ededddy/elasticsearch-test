# Experiments on ElasticSearch

## Tested Mapping

```
PUT cases
{
  "mappings" : {
    "properties": {
      "zh_content":{
        "type": "text",
        "store": true,
        "analyzer": "ik_max_word",
        "search_analyzer": "ik_smart"
      },
      "pt_content": {
        "type": "text",
        "store": true,
        "analyzer": "ik_max_word",
        "search_analyzer": "ik_smart"
      }
    }
  }
}
```

## Tested Query

Used terms : 自衛, 濫用武力, 有失尊嚴或欠缺道德的品行, 接受停職或更嚴厲的紀律處分

```
GET cases/_search
{
  "query": {
    "match_phrase": {
      "zh_content" : {
        "query": "接受停職或更嚴厲的紀律處分",
        "analyzer": "ik_smart"
      }
    }
  },
  "highlight": {
    "fields": {
      "zh_content": {}
    }
  }
}
```

Results :
1008 documents each with ~ 2000 to 13000 words

- sub 100 ms is achievable
- worst seen is about 1.7 seconds.

# Referenced Sites

I will only paste the install guides, no specific OS, but I use WSL2 so good luck with windows

1. https://ambar.cloud/blog/2017/01/02/es-large-text
2. https://www.elastic.co/guide/en/kibana/current/install.html
3. https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html
4. https://blog.csdn.net/zzqaaasss/article/details/104223480
5. https://github.com/medcl/elasticsearch-analysis-ik``````
