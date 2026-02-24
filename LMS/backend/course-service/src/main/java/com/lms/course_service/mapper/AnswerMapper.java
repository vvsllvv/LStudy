package com.lms.course_service.mapper;

import com.lms.course_service.dto.AnswerDto;
import com.lms.course_service.entity.Answer;
import com.lms.course_service.mapper.base.BaseMapper;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface AnswerMapper extends BaseMapper<Answer, AnswerDto> {
}
