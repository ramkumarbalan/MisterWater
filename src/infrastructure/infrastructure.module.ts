import { Module } from '@nestjs/common';

import { AuthGuard } from './auth/auth.gaurd';
import { UserModule } from 'src/v1/user/user.module';

@Module({
  imports: [UserModule],
  providers: [AuthGuard],
  exports: [AuthGuard],
})
export class InfrastructureModule {}
