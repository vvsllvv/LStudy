package com.lms.course_service.mapper;

import com.lms.course_service.dto.ModuleDto;
import com.lms.course_service.mapper.base.BaseMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;
import com.lms.course_service.entity.Module;

@Component
@Mapper(componentModel = "spring")
public interface ModuleMapper extends BaseMapper<Module, ModuleDto> {
}