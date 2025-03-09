import { DebateType } from '@/types/data'
import Image from '@/components/base/Image'
import ProfileIcon from '@/components/base/ProfileIcon'

function CarouselDebateCard({
    debate,
    ...props
}: { debate: DebateType } & React.HTMLProps<HTMLDivElement>) {
    return (
        <div id='carousel-debate-card' {...props}>
            <Image
                src={debate.book.image}
                alt={'debate book image'}
                width={65}
                height={100}
                noImageFontSize={40}
                noImageTextFontSize={10}
            />
            <div className='debate-info'>
                <div className='debate'>
                    <div className='debate-title'>{debate.title}</div>
                    <div className='debate-content'>{debate.content}</div>
                </div>
                <div className='debate-user'>
                    <ProfileIcon
                        size={23}
                        profile={debate.user.profile}
                        className='debate-user-icon'
                    />
                    <div className='debate-user-name'>{debate.user.name}</div>
                </div>
            </div>
        </div>
    )
}

export default CarouselDebateCard
