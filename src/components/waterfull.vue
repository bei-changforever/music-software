<template >
	<div class="masonry">
		<div class="item" v-for="(item, index) in pushjson">
			<img :src="item.user.avatarUrl" />
			<h2> {{ item.user.nickname }}</h2>
			<p>
				{{ item.json.msg }}
			</p>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		pushjson: {

		}
	},
	name: 'masonry'
}
</script>
<style lang="less" scoped>
.masonry {
	width: 90vw; // 默认宽度
	margin: 20px auto; // 剧中
	columns: 2; // 默认列数
	column-gap: 20px; // 列间距

	border-radius: 15px;

	.item {
		padding: 5px;
		width: 100%;
		border-radius: 15px;
		break-inside: avoid;
		margin-bottom: 30px;
		background-color: white;
	}

	.item img {
		width: 100px;
		border-radius: 15px;
	}

	.item h2 {
		padding: 8px 0;
	}

	.item P {
		color: #555;
	}
}
</style>