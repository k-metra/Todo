import LoadingRingImg from '../assets/loading_ring.png';

export default function LoadingRing() {
    return (
        <div className="loading-ring justify-center items-center flex h-screen w-screen">
            <div>
                <img className="animate-spin h-[48px] w-[48px]" src={LoadingRingImg} alt="Loading..." />
            </div>
        </div>
    )
}