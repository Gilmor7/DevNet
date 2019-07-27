
//profile creation vars
//------------------------

// Select options for status in profile
const STATUS_OPTIONS = [
    { label: '* Select Professional Status', value: 0 },
    { label: 'Developer', value: 'Developer' },
    { label: 'Junior Developer', value: 'Junior Developer' },
    { label: 'Senior Developer', value: 'Senior Developer' },
    { label: 'Manager', value: 'Manager' },
    { label: 'Student or Learning', value: 'Student or Learning' },
    { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
    { label: 'Intern', value: 'Intern' },
    { label: 'Other', value: 'Other' }
];

// Social network supported in profile creation
const SOCIALS = [
    { name: 'twitter', type: 'Profile', value: 'twitter' },
    { name: 'facebook', type: 'Page', value: 'facebook' },
    { name: 'youtube', type: 'Channel', value: 'youtube' },
    { name: 'linkedin', type: 'Profile', value: 'linkedin' },
    { name: 'instagram', type: 'Page', value: 'instagram' }
];

//-------------------------------------------------------------------------



export { SOCIALS, STATUS_OPTIONS };