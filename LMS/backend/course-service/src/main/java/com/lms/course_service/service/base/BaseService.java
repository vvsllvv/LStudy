package com.lms.course_service.service.base;

public interface BaseService <DTO> {
    void delete(Long id);
    void create(DTO dto);
    void update(Long ID, DTO dto);
    DTO read(Long id);
}
