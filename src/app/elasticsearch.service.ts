import { Injectable } from '@angular/core';
import { Client} from 'elasticsearch-browser'

@Injectable({
  providedIn: 'root'
})
export class ElasticsearchService {
  
  private client: Client;  

  private connect() {
    this.client = new Client({
      host: 'http://localhost:9200',
      log: 'trace'
    });
  }

  constructor() { 
    if (!this.client) {
      this.connect();
    }
  }

  isAvailable(): any {
    return this.client.ping({
      requestTimeout: Infinity,
      body: 'Elasticsearch connection work'
    });
  }

  addToIndex(value): any {
    return this.client.create(value);
  }

  fullTextSearch(_index, _field, _queryText): any {
    return this.client.search({
      index: _index,
      // type: _type,
      // filterPath: ['hits.hits._source', 'hits.total', '_scroll_id'],
      body: {
        'query': {
          'match_phrase_prefix': {
            [_field]: _queryText,
          }
        }
      }
    });
  }

  private queryalldocs = {
    'query': {
      'match_all': {}
    }
  };

  getAllDocuments(_index, _type): any {
    return this.client.search({
      index: _index,
      type: _type,
      body: this.queryalldocs
    });
  }

}
