import	React					from	'react';
import	Link					from	'next/link';
import	Image					from	'next/image';
import	{parseMarkdownUnset}	from	'utils';
import	{getAllPosts}			from	'utils/content';

function	Index({allPosts}) {
	return (
		<section>
			<div className={'w-full mt-10 md:mt-20 pt-2'}>
				<div className={'flex flex-col '}>
					<div className={'mb-8 grid grid-cols-3 gap-4'}>
						{allPosts.map((post) => (
							<div className={'masonry-item'} key={post.slug}>
								<Link href={`/newsletters/${post.slug}`}>
									<div className={'w-full bg-white cursor-pointer hover:shadow-md transition-shadow'}>
										<div className={'border-b border-ygray-500 flex w-full'}>
											<Image
												src={post?.image?.src || '/default.jpeg'}
												quality={90}
												objectFit={'cover'}
												loading={'eager'}
												width={post?.image?.width || 800}
												height={post?.image?.height || 445} />
										</div>
										<div className={'bg-white p-4'}>
											<div className={'flex flex-row justify-between w-full mb-2'}>
												<p className={'text-xs text-ygray-300'}>{`by ${post?.author || 'Yearn'}`}</p>
												<p className={'text-xs text-ygray-300'}>{`${post?.date}`}</p>
											</div>
											<h2
												className={'text-ygray-100 text-2xl font-bold font-title'}
												dangerouslySetInnerHTML={{__html: parseMarkdownUnset(post?.title || '')}} />
										</div>
									</div>
								</Link>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

export default Index;

export const getStaticProps = async ({locale}) => {
	const allPosts = getAllPosts(
		'_newsletters',
		[''],
		['title', 'date', 'slug', 'author', 'image'],
		locale
	);

	console.log(allPosts);
	return {
		props: {allPosts, locale},
	};
};