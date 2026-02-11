import { BoxOfficeRevenueType } from '../models/Financial/box-office-revenue-type';
import { Financial } from '../static-data/financial';

class FinancialService {
  public getBoxOfficeRevenue(): BoxOfficeRevenueType[] {
    return Financial['BoxOfficeRevenueType'];
  }
}
export const financialService: FinancialService = new FinancialService();
