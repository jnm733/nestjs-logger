import { Test, TestingModule } from "@nestjs/testing";
import { ApiService } from "./apiService";
import { ApiModule } from "./apiModule";
import { Logger } from "@nestjs/common";

describe('ApiService', () => {
    let apiService: ApiService;

    beforeAll(async ()=> {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ApiModule],
            providers: [ApiService]
        }).compile();
        apiService = module.get<ApiService>(ApiService);
    });
    
    it('should be check if result is defined', async() => {
        const result = await apiService.getHello();
        const lengthResult = 12;
        expect(result).toBeDefined();
        expect(result).toBeLessThanOrEqual(lengthResult);
    });
});
