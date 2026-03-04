package com.lms.course_service.mapper;

import com.lms.course_service.dto.AttemptDto;
import com.lms.course_service.entity.Attempt;
import com.lms.course_service.mapper.base.BaseMapper;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface AttemptMapper extends BaseMapper<Attempt, AttemptDto> {
}
