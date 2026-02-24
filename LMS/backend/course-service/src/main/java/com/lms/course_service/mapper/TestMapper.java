package com.lms.course_service.mapper;

import com.lms.course_service.dto.TestDto;
import com.lms.course_service.entity.Test;
import com.lms.course_service.mapper.base.BaseMapper;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface TestMapper extends BaseMapper<Test, TestDto> {
}
