import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ApiModule } from './apiModule';

describe('ApiHttpController', () => {
    let app: INestApplication;

    beforeAll(async ()=> {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ApiModule]
        }).compile();
        app = module.createNestApplication();
        await app.init();
    });
    
    it('should be return status code 200 when request the main resource', async() => {
        return request(app.getHttpServer())
            .get('/')
            .expect(200);
    });
});
