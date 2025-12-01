import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    UseGuards,
} from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Organizations')
@Controller('organizations')
export class OrganizationsController {
    constructor(private readonly organizationsService: OrganizationsService) { }

    @Post()
    @ApiOperation({ summary: 'Create new organization (Super Admin only)' })
    async create(@Body() createOrgDto: any) {
        return {
            success: true,
            message: 'Create organization - to be implemented',
        };
    }

    @Get()
    @ApiOperation({ summary: 'Get all organizations (Super Admin only)' })
    async findAll() {
        const organizations = await this.organizationsService.findAll();
        return {
            success: true,
            data: organizations,
        };
    }

    @Get('me')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get current organization details' })
    async getCurrentOrganization() {
        return {
            success: true,
            message: 'Get current organization - to be implemented',
        };
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get organization by ID' })
    async findOne(@Param('id') id: string) {
        return {
            success: true,
            message: 'Get organization by ID - to be implemented',
        };
    }

    @Patch('me/branding')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update organization branding' })
    async updateBranding(@Body() brandingDto: any) {
        return {
            success: true,
            message: 'Update branding - to be implemented',
        };
    }

    @Patch(':id/approve')
    @ApiOperation({ summary: 'Approve organization (Super Admin only)' })
    async approve(@Param('id') id: string) {
        return {
            success: true,
            message: 'Approve organization - to be implemented',
        };
    }

    @Patch(':id/suspend')
    @ApiOperation({ summary: 'Suspend organization (Super Admin only)' })
    async suspend(@Param('id') id: string) {
        return {
            success: true,
            message: 'Suspend organization - to be implemented',
        };
    }
}
