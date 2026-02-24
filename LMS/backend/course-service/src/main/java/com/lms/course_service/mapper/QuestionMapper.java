package com.lms.course_service.mapper;

import com.lms.course_service.dto.QuestionDto;
import com.lms.course_service.entity.Question;
import com.lms.course_service.mapper.base.BaseMapper;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface QuestionMapper  extends BaseMapper<Question, QuestionDto> {
}
