import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {TransactionItem} from '../models';
import {TransactionItemRepository} from '../repositories';

export class TransactionItemController {
  constructor(
    @repository(TransactionItemRepository)
    public transactionItemRepository : TransactionItemRepository,
  ) {}

  @post('/transaction-items')
  @response(200, {
    description: 'TransactionItem model instance',
    content: {'application/json': {schema: getModelSchemaRef(TransactionItem)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TransactionItem, {
            title: 'NewTransactionItem',
            exclude: ['transaction_item_id'],
          }),
        },
      },
    })
    transactionItem: Omit<TransactionItem, 'transaction_item_id'>,
  ): Promise<TransactionItem> {
    return this.transactionItemRepository.create(transactionItem);
  }

  @get('/transaction-items/count')
  @response(200, {
    description: 'TransactionItem model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TransactionItem) where?: Where<TransactionItem>,
  ): Promise<Count> {
    return this.transactionItemRepository.count(where);
  }

  @get('/transaction-items')
  @response(200, {
    description: 'Array of TransactionItem model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TransactionItem, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TransactionItem) filter?: Filter<TransactionItem>,
  ): Promise<TransactionItem[]> {
    return this.transactionItemRepository.find(filter);
  }

  @patch('/transaction-items')
  @response(200, {
    description: 'TransactionItem PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TransactionItem, {partial: true}),
        },
      },
    })
    transactionItem: TransactionItem,
    @param.where(TransactionItem) where?: Where<TransactionItem>,
  ): Promise<Count> {
    return this.transactionItemRepository.updateAll(transactionItem, where);
  }

  @get('/transaction-items/{id}')
  @response(200, {
    description: 'TransactionItem model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TransactionItem, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TransactionItem, {exclude: 'where'}) filter?: FilterExcludingWhere<TransactionItem>
  ): Promise<TransactionItem> {
    return this.transactionItemRepository.findById(id, filter);
  }

  @patch('/transaction-items/{id}')
  @response(204, {
    description: 'TransactionItem PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TransactionItem, {partial: true}),
        },
      },
    })
    transactionItem: TransactionItem,
  ): Promise<void> {
    await this.transactionItemRepository.updateById(id, transactionItem);
  }

  @put('/transaction-items/{id}')
  @response(204, {
    description: 'TransactionItem PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() transactionItem: TransactionItem,
  ): Promise<void> {
    await this.transactionItemRepository.replaceById(id, transactionItem);
  }

  @del('/transaction-items/{id}')
  @response(204, {
    description: 'TransactionItem DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.transactionItemRepository.deleteById(id);
  }
}
