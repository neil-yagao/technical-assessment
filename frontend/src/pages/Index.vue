<template>
	<q-page class="flex">
		<q-table
		 :data="customers"
		 :columns="columns"
		 row-key="id"
		 class=" full-width"
		 :filter="filter"
		 dense
		 separator="cell"
		>
			<template v-slot:body="props">
				<q-tr :props="props">
					<q-td
					 key="id"
					 :props="props"
					>
						{{ props.row.id }}
					</q-td>
					<q-td
					 key="name"
					 :props="props"
					>{{ props.row.name }}</q-td>
					<q-td
					 key="status"
					 :props="props"
					>{{ props.row.status }}</q-td>
					<q-td
					 key="op"
					 :props="props"
					>
						<q-btn
						 flat
						 color="primary"
						 @click="showNoteList(props.row.id,props.row.notes)"
						>
							Notes
						</q-btn>
						<q-btn
						 flat
						 color="warning"
						 @click="showCustomerDetail(props.row)"
						>
							Detail
						</q-btn>
					</q-td>
				</q-tr>
			</template>
			<template v-slot:top>
				<div class="col-2 q-table__title">Customers</div>
				<q-space />
				<q-input
				 borderless
				 dense
				 debounce="300"
				 v-model="filter"
				 placeholder="Search"
				>
					<template v-slot:append>
						<q-icon name="search" />
					</template>
				</q-input>
				<q-btn
				 flat
				 round
				 @click="showCustomerDetail()"
				>
					<q-icon
					 name="add"
					 color="positive"
					>
					</q-icon>
				</q-btn>
			</template>
		</q-table>
		<customer-detail ref="customerDetail" />
		<note-list ref="noteList" />
	</q-page>
</template>

<style>
</style>

<script>
import { mapGetters } from "vuex";
import { values, sortBy } from "lodash";
import CustomerDetail from "./CustomerDetail.vue";
import NoteList from "./NoteList.vue";
export default {
	name: "PageIndex",
	data() {
		return {
			columns: [
				{
					name: "id",
					required: true,
					label: "Customer Id",
					align: "left",
					field: "id",
					sortable: true
				},
				{
					name: "name",
					align: "center",
					label: "Name",
					field: "name",
					sortable: true
				},
				{
					name: "status",
					label: "Status",
					field: "status",
					align: "center",
					sortable: true
				},
				{
					name: "op",
					label: "Operation",
					align: "center"
				}
			],
			filter: ""
		};
	},
	computed: {
		customers() {
			return this.$store.state.customer.customers;
		}
	},
	mounted() {
		this.$store.dispatch("loadCustomers");
	},
	methods: {
		showCustomerDetail(detail) {
			this.$refs.customerDetail.showDetail(detail);
		},
		showNoteList(id,notes) {
			this.$refs.noteList.showNotes(id,notes);
		}
	},
	components: {
		CustomerDetail,
		NoteList
	}
};
</script>
