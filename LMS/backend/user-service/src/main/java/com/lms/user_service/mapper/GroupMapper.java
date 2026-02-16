package com.lms.user_service.mapper;

import com.lms.user_service.dto.GroupDto;
import com.lms.user_service.entity.Group;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface GroupMapper {
    GroupDto toGroupDto(Group group);
}
