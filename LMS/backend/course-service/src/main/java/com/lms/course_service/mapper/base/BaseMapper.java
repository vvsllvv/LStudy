package com.lms.course_service.mapper.base;

import java.util.List;

public interface BaseMapper <ENTITY, DTO> {
    DTO toDto(ENTITY entity);
    List<DTO> toDto(List<ENTITY> entity);

    ENTITY toEntity(DTO dto);
    List<ENTITY> toEntity(List<DTO> dto);
}