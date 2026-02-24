package com.lms.course_service.mapper;

import com.lms.course_service.dto.ThemeDto;
import com.lms.course_service.entity.Theme;
import com.lms.course_service.mapper.base.BaseMapper;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface ThemeMapper extends BaseMapper<Theme, ThemeDto> {
}

