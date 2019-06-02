<template>
	<q-dialog
	 v-model="show"
	 class="flex"
	>
		<q-card style="width:80vw">
			<q-card-section class="row items-center">
				<div class="col-2 q-table__title">Notes</div>
				<q-space class="col-2" />
				<!-- <q-input
				 borderless
				 dense
				 debounce="300"
				 v-model="filter"
				 placeholder="Search"
				 class="col-4"
				>
					<template v-slot:append>
						<q-icon name="search" />
					</template>
				</q-input> -->
				<q-btn
				 flat
				 round
				 @click="createNewNote()"
				>
					<q-icon
					 name="add"
					 color="positive"
					>
					</q-icon>
				</q-btn>
			</q-card-section>

			<q-card-section>
				<q-list>
					<note-item
					 v-for="(note) in notes"
					 :key="note.id"
					 :note="note"
					 @new-note="newNote($event)"
					 @udpate-note="updateNote($event)"
					 @unexpanded="removeEmpty()"
					 @delete-note="removeNote($event)"
					>
					</note-item>
				</q-list>
			</q-card-section>
		</q-card>
	</q-dialog>
</template>

<script>
import { filter } from "lodash";
import NoteItem from "../components/NoteItem.vue";
export default {
	components: { NoteItem },
	data() {
		return {
			show: false,
			notes: [],
			filter: "",
			customerId: ""
		};
	},
	methods: {
		showNotes(customerId) {
			if (customerId) {
				this.customerId = customerId;
				this.$store
					.dispatch("loadNotes", this.customerId)
					.then(notes => {
						this.notes = notes;
						this.show = true;
					});
			}
		},
		createNewNote() {
			let hasNewNote = false;
			this.notes.forEach(note => {
				if (!note.id) {
					hasNewNote = true;
				}
			});
			if (!hasNewNote) {
				this.notes.push({
					id: "",
					name: ""
				});
			}
		},
		newNote(nn) {
			this.$store
				.dispatch("addNoteToCustomer", {
					customerId: this.customerId,
					note: nn
				})
				.then(newNN => {
					this.notes.push(newNN)
				});
		},
		updateNote(note) {
			this.concatNote(note);
			this.$store.dispatch("updateNote", {
				customerId: this.customerId,
				note: note
			});
		},
		concatNote(note) {
			let notes = [];
			debugger;
			this.notes.forEach(n => {
				debugger;
				if (!n.id || note.id === n.id) {
					notes.push(note);
				} else {
					notes.push(n);
				}
			});
			this.notes = notes;
		},
		removeEmpty() {
			this.notes = filter(this.notes, function(note) {
				return note.id;
			});
		},
		removeNote(note) {
			this.notes = filter(this.notes, function(n) {
				return note.id !== n.id;
			});
			this.$store.dispatch("deleteNote", {
				customerId: this.customerId,
				noteId: note.id
			});
		}
	},
	mounted() {}
};
</script>

<style>
</style>
