import {
  Controller,
  Get,
  Inject,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuditService } from './audit.service';
import { AuditQueryDto } from './dto/audit-query.dto';
import { Roles } from '../users/role/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { AuditFindResponseDto } from './dto/audit-response.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('audit')
@Controller('audit')
@ApiBearerAuth()
@UseInterceptors(CacheInterceptor)
export class AuditController {
  @Inject()
  private auditService: AuditService;

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiResponse({
    type: AuditFindResponseDto,
  })
  findAll(@Query() pagination: AuditQueryDto): Promise<AuditFindResponseDto> {
    return this.auditService.findPaginated(pagination);
  }
}
