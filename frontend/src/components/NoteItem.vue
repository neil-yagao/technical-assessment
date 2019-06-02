<template>
	<q-expansion-item
	 expand-separator
	 icon="note"
	 :label="note.name"
	 v-model="selected"
	>
		<q-card>
			<q-card-section v-if="!editable">
				<p>{{note.content}}</p>
			</q-card-section>
			<q-card-section v-if="editable">
				<q-input
				 label="Name"
				 filled
				 v-model="editingNote.name"
				/>
				<q-input
				 type="textarea"
				 class="q-mt-md"
				 label="Content"
				 filled
				 v-model="editingNote.content"
				/>
			</q-card-section>
			<q-card-actions>
				<q-btn
				 color="negative"
				 flat
				 v-if="note.id"
				 @click="deleteNote()"
				>
					Delete
				</q-btn>
				<q-space />
				<q-btn
				 v-if="!note.id"
				 flat
				 color="primary"
				 @click="createNote()"
				>
					Create
				</q-btn>
				<q-btn
				 v-if="note.id&& editable"
				 flat
				 color="info"
				 @click="updateNote()"
				>
					Save
				</q-btn>
				<q-btn
				 v-if="note.id && !editable"
				 flat
				 color="info"
				 @click="editNote()"
				>
					Edit
				</q-btn>
				<q-btn
				 flat
				 @click="closeEditing()"
				>
					Cancel
				</q-btn>
			</q-card-actions>
		</q-card>

	</q-expansion-item>

</template>

<script>
export default {
	props: {
		note: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			editingNote: {
				name: "",
				content: ""
			},
			selected: !this.note.id,
			editable: !this.note.id
		};
	},
	methods: {
		closeEditing() {
			this.selected = false;
			this.editable = false;
		},
		createNote() {
			this.$emit("new-note", this.editingNote);
			this.unselectItem();
		},
		editNote() {
			this.editable = true;
			this.editingNote.id = this.note.id;
			this.editingNote.name = this.note.name;
			this.editingNote.content = this.note.content;
		},
		updateNote() {
			this.$emit("udpate-note", this.editingNote);
			this.unselectItem();
		},
		unselectItem() {
			this.selected = false;
			this.editable = false;
		},
		deleteNote(){
			this.$emit('delete-note',this.note);
			this.unselectItem();
		}
	},
	watch:{
		selected(newVal){
			if(!newVal){
				this.$emit('unexpanded')
			}
		}
	}
};
</script>

<style>
</style>
