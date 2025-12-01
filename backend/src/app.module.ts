import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    OrganizationsModule,
    // TODO: Add other modules as they are created
    // UsersModule,
    // RolesModule,
    // PaymentsModule,
    // NotificationsModule,
    // LogsModule,
    // SettingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
