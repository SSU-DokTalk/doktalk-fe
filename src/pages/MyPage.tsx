import axios from 'axios'
import { useEffect, useState } from 'react'

import Profile from '@/components/section/Profile'
import { selectUser } from '@/stores/user'
import { useAppSelector } from '@/stores/hooks'

import { UserType } from '@/types/data'
import { InitialUser, MyTabsCandidate } from '@/types/initialValue'
import ProfileTabDetails from '@/components/section/ProfileTabDetails'

function MyPage() {
    const user = useAppSelector(selectUser)
    const [userProfile, setUserProfile] = useState<UserType>(InitialUser)
    const [currentTab, setCurrentTab] = useState<MyTabsCandidate>('/post')

    useEffect(() => {
        if (user.id != 0) {
            axios.get('/api/user/me').then((res) => {
                setUserProfile(res.data)
            })
        }
    }, [user.id])

    return (
        <div id='mypage'>
            <Profile
                userProfile={userProfile}
                setUserProfile={setUserProfile}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
            />
            <div className='content-container'>
                <div className='content md:w-1/2 md:mx-auto!'>
                    <ProfileTabDetails
                        currentTab={currentTab}
                        userProfile={userProfile}
                    />
                </div>
            </div>
        </div>
    )
}

export default MyPage
