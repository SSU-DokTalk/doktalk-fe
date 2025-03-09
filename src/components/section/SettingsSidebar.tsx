/* eslint-disable @typescript-eslint/no-explicit-any */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faComment, faHeart } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'

interface MenuItem {
    name: string
    icon: any
}

const menuItems: MenuItem[] = [
    { name: '좋아요', icon: faHeart },
    { name: '댓글', icon: faComment },
    { name: '알림', icon: faBell },
]

interface SettingsSidebarProps {
    tabIndex: number
    setTabIndex: (index: number) => void
}

function SettingsSidebar({ tabIndex, setTabIndex }: SettingsSidebarProps) {
    const getButtonClassName = (isActive: boolean) =>
        `tab-button${isActive ? ' activated' : ''}`

    return (
        <div id='settings-sidebar'>
            <h1>설정</h1>

            <h4 className='subtitle'>공개 범위</h4>
            <button
                className={getButtonClassName(tabIndex === 0)}
                onClick={() => setTabIndex(0)}
            >
                <FontAwesomeIcon className='icon' icon={faLock} fill='white' />
                공개 범위 수정
            </button>

            <h4 className='subtitle'>내 활동</h4>
            {menuItems.map((item, index) => {
                const isActive = tabIndex === index + 1
                return (
                    <button
                        key={item.name}
                        className={getButtonClassName(isActive)}
                        onClick={() => setTabIndex(index + 1)}
                    >
                        <FontAwesomeIcon className='icon' icon={item.icon} />
                        {item.name}
                    </button>
                )
            })}
        </div>
    )
}

export default SettingsSidebar
