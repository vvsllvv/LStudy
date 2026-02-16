package com.lms.user_service.mapper;

import com.lms.user_service.dto.ProfileDto;
import com.lms.user_service.dto.RegisterDto;
import com.lms.user_service.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface UserMapper {

    RegisterDto toRegisterDto(User user);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "groups", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "isEnabled", ignore = true)
    User toUserEntity(RegisterDto registerDto);

    ProfileDto toProfileDto(User user);
}
