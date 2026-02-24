package com.lms.course_service.mapper;

import com.lms.course_service.dto.ParagraphDto;
import com.lms.course_service.entity.Paragraph;
import com.lms.course_service.mapper.base.BaseMapper;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface ParagraphMapper  extends BaseMapper<Paragraph, ParagraphDto> {
}
