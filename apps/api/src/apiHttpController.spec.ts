import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { ApiHttpController } from "./apiHttpController";
import { ApiService } from "./apiService";
import { ApiModule } from './apiModule';

describe('ApiHttpController', () => {
    let app: INestApplication;
    let apiHttpControler: ApiHttpController;
    let apiService: ApiService;

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
