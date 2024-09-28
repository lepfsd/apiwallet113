import {
  Body,
  Controller,
  Get,
  Post,
  Headers,
  Param,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { ApiTags } from '@nestjs/swagger';
import { UserDTO } from './dto/user.dto';
import { LoginDTO } from './dto/login.dto';
import { ChargeDTO } from './dto/wallet-charge.dto';
import { PaymentDTO } from './dto/payment.dto';
import { ConfirmPaymentDTO } from './dto/confirm.dto';

@ApiTags('wallet')
@Controller('api/v1/rest')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly httpService: HttpService,
  ) {}

  @Post('signin')
  async signIn(@Body() loginDTO: LoginDTO) {
    return this.httpService
      .post('http://localhost:3001/api/v1/auth/signin', loginDTO)
      .pipe(map((response) => response.data));
  }

  @Post('signup')
  async signUp(@Body() userDTO: UserDTO) {
    return this.httpService
      .post('http://localhost:3001/api/v1/auth/signup', userDTO)
      .pipe(map((response) => response.data));
  }

  @Post('wallet/charge')
  async charge(
    @Body() chargeDTO: ChargeDTO,
    @Headers('authorization') authHeader: string,
  ) {
    const headers = {
      Authorization: authHeader,
      'Content-Type': 'application/json',
    };
    return this.httpService
      .post('http://localhost:3001/api/v1/wallet/charge', chargeDTO, {
        headers,
      })
      .pipe(map((response) => response.data));
  }

  @Get('wallet/funds/:document/:phone')
  async consult(
    @Param('document') document: string,
    @Param('phone') phone: string,
    @Headers('authorization') authHeader: string,
  ) {
    const headers = {
      Authorization: authHeader,
      'Content-Type': 'application/json',
    };
    return this.httpService
      .get(`http://localhost:3001/api/v1/wallet/funds/${document}/${phone}`, {
        headers,
      })
      .pipe(map((response) => response.data));
  }

  @Post('wallet/payment')
  async payment(
    @Body() paymentDTO: PaymentDTO,
    @Headers('authorization') authHeader: string,
  ) {
    const headers = {
      Authorization: authHeader,
      'Content-Type': 'application/json',
    };
    return this.httpService
      .post('http://localhost:3001/api/v1/wallet/payment', paymentDTO, {
        headers,
      })
      .pipe(map((response) => response.data));
  }

  @Put('wallet/payment')
  async confirm(
    @Body() confirmPaymentDTO: ConfirmPaymentDTO,
    @Headers('authorization') authHeader: string,
  ) {
    const headers = {
      Authorization: authHeader,
      'Content-Type': 'application/json',
    };
    return this.httpService
      .put('http://localhost:3001/api/v1/wallet/payment', confirmPaymentDTO, {
        headers,
      })
      .pipe(map((response) => response.data));
  }
}
