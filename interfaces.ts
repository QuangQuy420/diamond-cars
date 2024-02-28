export interface SubmitButtonProps {
    typeSubmit: string;
}

export interface ModalConfirmProps {
    title: string,
    content: string,
    confirm?: string,
    cancel?: string,
    showModal: boolean,
    toggleModal: (value: boolean) => void,
    userId: string,
}

export interface UserListProps {
    userList: any,
}

export interface UserInfoProps {
    email: string,
    name: string,
    role: string,
    avatar: string,
    createAt: string,
    updatedAt: string,
    profile: {
        bio: string,
        phoneNumber: string,
        address: string,

    }
}

export interface EditDetailUserProps {
    userInfo: UserInfoProps,
    userId: string,
}