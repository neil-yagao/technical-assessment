<template>
	<q-dialog
	 class="flex"
	 position="bottom"
	 persistent
	 maximized
	 transition-show="slide-up"
	 transition-hide="slide-down"
	 v-model="show"
	>
		<q-card class="full-height">
			<q-card-section class="row">
				<span class="text-h6 col-8">
					Customer&nbsp;&nbsp;&nbsp;{{customerValue.name}}
				</span>
				<q-space />
				<q-btn
				 v-close-popup
				 size="sm"
				 round
				 icon="close"
				 flat
				>
				</q-btn>
			</q-card-section>

			<q-card-section class="q-mx-md">
				<div class="row q-gutter-sm no-wrap q-px-md">
					<q-input
					 label="Title"
					 filled
					 class="col-md-4 col-xs-12"
					 v-model="customerValue.title"
					/>
					<q-input
					 label="Name"
					 filled
					 class="col-md-4 col-xs-12"
					 v-model="customerValue.name"
					/>
					<q-select
					 label="Status"
					 filled
					 class="col-md-4 col-xs-12"
					 :options="['prospective', 'current' , 'non-active']"
					 v-model="customerValue.status"
					/>
				</div>
				<div class="row q-gutter-sm q-mt-md no-wrap q-pl-md">
					<q-input
					 label="Phone"
					 filled
					 class="col-md-6 col-xs-12"
					 v-model="customerValue.phone"
					/>
					<q-input
					 label="Email"
					 filled
					 class="col-md-6 col-xs-12"
					 v-model="customerValue.email"
					/>
				</div>
				<div class="row q-mt-md q-gutter-sm q-pl-md">
					<q-input
					 label="Address"
					 filled
					 class="col"
					 v-model="customerValue.address"
					/>
				</div>
			</q-card-section>

			<q-separator />
			<q-card-actions>
				<q-space />
				<q-btn
				 flat
				 color="primary"
				 @click="addNewCustomer()"
				 v-if="!customerValue.id"
				>Create</q-btn>
				<q-btn
				 flat
				 color="info"
				 v-if="customerValue.id"
				 @click="updateCustomer()"
				>Save</q-btn>
				<q-btn
				 flat
				 color="warning"
				 v-close-popup
				>Cancel</q-btn>
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script>
export default {
	props: {},
	data() {
		return {
			customerValue: {},
			show: false
		};
	},
	methods: {
		addNewCustomer() {
			this.$store.dispatch("addCustomer", this.customerValue).then(() => {
				this.show = false;
			});
		},
		showDetail(customer) {
			console.log("customer", customer);
			if (customer) {
				this.customerValue = Object.assign(
					{},
					this.customerValue,
					customer
				);
			} else {
				this.resetCustomer();
			}
			this.show = true;
		},
		updateCustomer() {
			this.$store
				.dispatch("updateCustomer", this.customerValue)
				.then(() => {
					this.show = false;
				});
		},
		resetCustomer() {
			this.customerValue = {
				id: "",
				name: "",
				address: "",
				phone: "",
				email: "",
				title: "",
				status: ""
			};
		}
	},
	created() {
		this.resetCustomer();
	}
};
</script>

<style>
</style>
