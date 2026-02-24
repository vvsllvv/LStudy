package com.lms.course_service.service.base;

import com.lms.course_service.exception.NotFoundException;
import com.lms.course_service.mapper.base.BaseMapper;
import com.lms.course_service.repository.base.BaseRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
public abstract class CustomService<ENTITY, DTO>{

    private final BaseRepository<ENTITY> repository;
    private final BaseMapper<ENTITY, DTO> mapper;

    @Transactional
    public void delete(Long id) {
        if (repository.existsById(id))
            new NotFoundException("Object not found.");

        repository.deleteById(id);
        log.info("Object is deleted successfully.");
    }

    @Transactional
    public void create(DTO dto) {
        ENTITY entity = mapper.toEntity(dto);

        repository.save(entity);
        log.info("Object is created successfully.");
    }

    @Transactional
    public void create(Long id, DTO dto) { }

    @Transactional
    public DTO read(Long id) {
        ENTITY entity = repository.findById(id).orElseThrow(() -> new NotFoundException("Object not found."));

        return mapper.toDto(entity);
    }

    @Transactional
    public List<DTO> readAll() {
        List<ENTITY> all = repository.findAll();
        return mapper.toDto(all);
    }

    @Transactional
    public abstract void update(Long id, DTO dto);

}
