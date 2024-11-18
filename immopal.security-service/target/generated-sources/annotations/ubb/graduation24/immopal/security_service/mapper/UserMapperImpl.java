package ubb.graduation24.immopal.security_service.mapper;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import ubb.graduation24.immopal.security_service.domain.User;
import ubb.graduation24.immopal.security_service.model.UserDto;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-08-26T15:02:30+0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.11 (Amazon.com Inc.)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDto userToUserDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserDto.UserDtoBuilder userDto = UserDto.builder();

        userDto.userId( user.getUserId() );
        userDto.email( user.getEmail() );
        userDto.password( user.getPassword() );
        userDto.role( user.getRole() );
        userDto.personId( user.getPersonId() );
        userDto.accountNonExpired( user.isAccountNonExpired() );
        userDto.accountNonLocked( user.isAccountNonLocked() );
        userDto.credentialsNonExpired( user.isCredentialsNonExpired() );
        userDto.enabled( user.isEnabled() );

        return userDto.build();
    }

    @Override
    public User userDtoToUser(UserDto userDto) {
        if ( userDto == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.userId( userDto.getUserId() );
        user.email( userDto.getEmail() );
        user.password( userDto.getPassword() );
        user.role( userDto.getRole() );
        user.personId( userDto.getPersonId() );
        user.accountNonExpired( userDto.isAccountNonExpired() );
        user.accountNonLocked( userDto.isAccountNonLocked() );
        user.credentialsNonExpired( userDto.isCredentialsNonExpired() );
        user.enabled( userDto.isEnabled() );

        return user.build();
    }
}
